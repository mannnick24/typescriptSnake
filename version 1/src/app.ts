import {CanvasBoardView} from './CanvasBoardView.js';

const bordView = new CanvasBoardView();

try
{
    bordView.start();
}
catch( e )
{
    document.getElementById("message")!.textContent = e;
}


