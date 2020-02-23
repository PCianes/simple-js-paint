const paint = $P('red', 10);
const tools = document.querySelectorAll('.tool');
[ ...tools].map( tool => tool.addEventListener('click', function( e ){
    paint.setTool( e.target.dataset.tool );
}) );