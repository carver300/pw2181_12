var i = 0;

function cuenta()
{
	i++;
	postMessage(i);
	setTimeout("cuenta()",500);
}
cuenta();