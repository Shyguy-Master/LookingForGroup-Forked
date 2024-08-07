// bounding box collision detection - it compares PIXI.Rectangles
function rectsIntersect(a,b){
	var ab = a.getBounds();
	var bb = b.getBounds();
	return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}

//Drag properies for the posts
function onDragMove(event)
{
    if (dragTarget)
    {
        let mousePosition = app.renderer.plugins.interaction.mouse.global;
        dragTarget.position = mousePosition;
    }
}

function onDragStart()
{
    dragTarget = this;
    //Remove and add the post to bring it to the front
    stage.removeChild(this);
    stage.addChild(this);
    this.alpha = 0.5;
    stage.on('pointermove', onDragMove);
}

function onDragEnd()
{
    if (dragTarget)
    {
        stage.off('pointermove', onDragMove);
        dragTarget.alpha = 1;
        //Delete the post if it overlaps with the trashcan when it's dropped
        if(rectsIntersect(dragTarget, trash)){
            stage.removeChild(dragTarget);
        }
        dragTarget = null;
    }
}