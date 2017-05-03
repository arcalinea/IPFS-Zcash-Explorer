export function LoadData(newQuery, callback){
  console.log('in helper function, loading data')
  var request = new XMLHttpRequest();
  console.log('newQuery', newQuery)
  request.open('GET', "http://107.170.229.52:8080/api/v0/dag/get/" + newQuery, true);
      request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      //this callback gets called when the server responds to the ajax call
      request.onreadystatechange = function(){
          if (request.readyState === 4 && request.status === 200){
              var returnedJson = JSON.parse(request.responseText);
              // console.log('returned json', returnedJson)
              callback(returnedJson);
              //this is where you would want to run setState if you need the returned Json for it.
              // this.setState({data: returnedJson});
          }
          else if (request.readyState === 4 && request.status !== 200){
              console.log("Request status:", request.status)
              alert('error', request.status);
          }
      };
      request.send();
}
