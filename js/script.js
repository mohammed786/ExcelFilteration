var X = XLSX;
var wb;
    $(document).ready(function() {
        $("#output").hide();
    });
    function to_json(workbook,callback) {
        var result = [];
        if(workbook == undefined) throw "File Not Found"
        workbook.SheetNames.forEach(function(sheetName) {
             
            var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
           
            if(roa.length > 0){
                result = roa;
            }
        });
        callback(result);
    }
    function process_wb() {
        try{
            var weekstart = new Date(year.value + '-' + month.value + '-' + day.value);
            if (isNaN(weekstart.getTime())) {  
                throw "Date in not valid"
            }
            var weekend = new Date(weekstart);
            weekend.setDate(weekstart.getDate() + 6)
            weekend.setHours(0,0,0,0)
            weekstart.setHours(0,0,0,0)
            to_json(wb,function(data){
                  //out.innerText = JSON.stringify(data,2,2);
                  var incident = [0,0];
                  var ctask = [0,0];
                  var task = [0,0];
                  var inWeek = 0;
                  var outWeek = 0;
                  var incidents = []
                  for(var i = 0;i<data.length;i++){
                     var createdDate = new Date(data[i]["Created"]);
                     createdDate.setHours(0,0,0,0)
                     
                     if(createdDate.getMonth() == weekstart.getMonth() && createdDate.getFullYear() == weekstart.getFullYear() && createdDate <= weekend){
                         var cat = data[i]["Number"].replace(/[0-9]/g, '');
                         if(cat === 'INC')
                             incident[0]++;
                         if(cat === 'CTASK')
                             ctask[0]++;
                         if(cat === 'TASK')
                             task[0]++;
                     }
                      
                     if(createdDate >= weekstart && createdDate <= weekend){
                             var cat = data[i]["Number"].replace(/[0-9]/g, '');
                             if(cat === 'INC'){
                                console.log(createdDate)
                                incident[1]++;
                                incidents.push(data[i]["Number"])
                             }
                             if(cat === 'CTASK')
                                 ctask[1]++;
                             if(cat === 'TASK')
                                 task[1]++;
                     }
                     if(!(data[i]["State"].includes("Resolved") || data[i]["State"].includes("Closed")) && (cat === 'INC' || cat == 'TASK')){
                         if(createdDate >= weekstart && createdDate <= weekend)
                             inWeek++;
                         else if(createdDate <= weekstart)
                             outWeek++;
                     }
                  }
                  mInc.innerText = incident[0];
                  mTask.innerText = task[0];
                  mCTask.innerText = ctask[0];

                  wInc.innerText =  incident[1];
                  wTask.innerText =  task[1];
                  wCTask.innerText = ctask[1];

                  mWeek.innerText = outWeek;
                  lWeek.innerText = inWeek;

                  inc.innerText = incidents;
                  $("#output").show();
            })
        }
        catch(err){
            alert(err)
        }
    }
    var xlf = document.getElementById('xlf');
    function handleFile(e) {
        var files = e.target.files;
        var f = files[0];
        upload.innerText = f.name;
        {
            var reader = new FileReader();
            var name = f.name;
            reader.onload = function(e) {
                var data = e.target.result;
                var arr = fixdata(data);
                wb = X.read(btoa(arr), {type: 'base64'});
            };
            reader.readAsArrayBuffer(f);
        }
    }
    function fixdata(data) {
        var o = "", l = 0, w = 10240;
        for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
        o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
        return o;
    }
    if(xlf.addEventListener) xlf.addEventListener('change', handleFile, false);
