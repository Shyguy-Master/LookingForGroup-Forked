import pool from "../config/database.js"

const getProjects = async (req, res) => {
    // Get all projects

    const projects = await pool.query(`
        SELECT p.project_id, p.title, p.description, p.user_id, JSON_ARRAYAGG(t.label) AS tags
        FROM projects p 
            JOIN project_tags pt ON p.project_id = pt.project_id 
            JOIN tags t ON pt.tag_id = t.tag_id 
        GROUP BY p.project_id
        `);

    return res.status(200).json({
        status: 200,
        data: projects
    });
}

const createProject = async (req, res) => {
    // Create a new project

    // Get input data
    const { title, description, id, tags} = req.body

    // Add project to database and get back its id
    const sql = "INSERT INTO projects (title, description, user_id) VALUES (?, ?, ?) RETURNING project_id";
    const values = [title, description, id];
    const project = await pool.query(sql, values);
    
    // Get tag ids and add project's tags to database 
    const placeholders = tags.map(() => "?").join(",");
    const tagIds = await pool.query(`SELECT tag_id FROM tags WHERE label IN (${placeholders})`, tags);
    
    for (let tag of tagIds) {
        await pool.query("INSERT INTO project_tags (project_id, tag_id) VALUES (?, ?)", [project[0].project_id, tag.tag_id]);
    }
    
    return res.sendStatus(201);
}

const getProjectById = async (req, res) => {
    // Get a project using its id

    // Get id from url 
    const { id } = req.params;

    // Get project data
    const sql = `
        SELECT p.project_id, p.title, p.description, p.user_id, JSON_ARRAYAGG(t.label) AS tags
        FROM projects p 
            JOIN project_tags pt ON p.project_id = pt.project_id 
            JOIN tags t ON pt.tag_id = t.tag_id
        WHERE p.project_id = ? 
        GROUP BY p.project_id
        `;
    const values = [id];
    const rows = await pool.query(sql, values);
    
    return res.status(200).json({
        status: 200,
        data: rows
    });
}

const updateProject = async (req, res) => {
    // Update a project

    // Get input data
    const { id } = req.params;
    const { title, description} = req.body

    // Update database with project's new info
    const sql = "UPDATE projects SET title = ?, description = ? WHERE project_id = ?";
    const values = [title, description, id];
    await pool.query(sql, values);
    
    return res.sendStatus(204)
}

const addTag = async (req, res) => {
    // Add a tag to a project

    // Get input data
    const { id } = req.params;
    const { tag } = req.body

    // Get tag id and add project's tag into database
    const tagId = await pool.query(`SELECT tag_id FROM tags WHERE label = ?`, tag);
    await pool.query("INSERT INTO project_tags (project_id, tag_id) VALUES (?, ?)", [id, tagId[0].tag_id]);

    return res.sendStatus(201);
}

const deleteTag = async (req, res) => {
    // Delete tag from a project

    // Get input data
    const { id } = req.params;
    const { tag } = req.body

    // Get tag id and remove project's tag from database
    const tagId = await pool.query(`SELECT tag_id FROM tags WHERE label = ?`, tag);
    await pool.query("DELETE FROM project_tags WHERE project_id = ? AND tag_id = ?", [id, tagId[0].tag_id]);

    return res.sendStatus(204);
}

export { getProjects, createProject, getProjectById, updateProject, addTag, deleteTag };