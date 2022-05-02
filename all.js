const dataAry = JSON.parse(localStorage.getItem('bmiList')) || [];

// 輸入的變數
const height = document.querySelector('#height');
const weight = document.querySelector('#weight');
const see_result = document.querySelector('.see_result');
const heightwarn = document.querySelector('.heightwarn');
const weightwarn = document.querySelector('.weightwarn');
// 顯示 result 的變數 
const lastresult = document.querySelector('.lastresult');
const resulText = document.querySelector('.result-text'); 
const restart = document.querySelector('.restart');
const resultstatus = document.querySelector('.result-status')
const resultNumber = document.querySelector('.result-number')
// record
const recordlist = document.querySelector('.record-list');
const clearAll = document.querySelector('.clearAll');
// click
renderRecordList()
clearAll.addEventListener('click',clearAlldata,false);
see_result.addEventListener('click',checkInput,false);
recordlist.addEventListener('click',clearSingledata,false);
restart.addEventListener('click',restartcal,false)



// confirm whether input if not raise the warning before see_result
function checkInput(){
    if(height.value == '' ){
        heightwarn.classList.remove('visi');
    }
    else{
        heightwarn.classList.add('visi');
    }
    if(weight.value == '' ){
        weightwarn.classList.remove('visi');
    }
    else{
        weightwarn.classList.add('visi');
    }
    if (height.value != '' && weight.value != ''){
        calBMI(height.value,weight.value);
    }
};

// BMI condition judge 
function BMIRange(BMI){
  let condition,color;
  if (16 <= BMI && BMI < 18.5) {
        condition = '過輕';
        color = '#31BAF9';
     
    } else if (18.5 <= BMI && BMI < 25) {
        condition = '理想';
        color = '#86D73F';
      
    } else if (25 <= BMI && BMI < 30) {
        condition = '過重';
        color = '#FF982D';
       
    } else if (30 <= BMI && BMI < 35) {
        condition = '輕度肥胖';
        color = '#FF6C03';
       
    } else if (35 <= BMI && BMI < 40) {
        condition = '中度肥胖';
        color = '#FF6C03';
       
    } else if (BMI >= 40) {
        condition = '重度肥胖';
        color = '#FF1200';
    
    } else {
        condition = '嚴重過輕';
        color = 'yellow';
    }
  return [condition,color];
};

function sendToStorage(result){
    dataAry.push(result);
    localStorage.setItem("bmiList",JSON.stringify(dataAry));
    renderRecordList();
  };

// 更新紀錄
function renderRecordList(){
    let list ='';
    let result = dataAry;
    console.log(result)
    if(result.length != 0){
        clearAll.classList.remove('visi')
    }
    else{
        clearAll.classList.add('visi')
    }
    for(let i = result.length-1;i >= 0;i--){
        let{BMI,height,weight,date,condition,color} = result[i]
        list = list + 
        `<li style="border-left:5px solid ${color};"> 
        <h3>${condition}</h3>
        <div class="detail">
        <h4>BMI</h4>
        <span>${BMI}</span>
        </div>

        <div class="detail">
        <h4>weight</h4>
        <span>${weight} kg</span>
        </div>

        <div class="detail">
        <h4>height</h4>
        <span>${height} cm</span>
        </div>

        <div>
        <span>${date}</span>
        </div> 
        <a href="#" class="clearOne ${result.length-i-1}">
        <i class="fa-solid fa-delete-left"></i>
        </a>
        </li>`
        
    }
    recordlist.innerHTML = list;
};


// 計算 BMI
function calBMI(height,weight){
    console.log(height);
    console.log(weight);
    let BMI=(weight/((height*0.01)**2)).toFixed(2);
    console.log(BMI);
    let date=new Date().toLocaleDateString();
    let [condition,color]=BMIRange(BMI);
  
    let result={
        BMI:BMI,
        height:height,
        weight:weight,
        date:date,
        condition:condition,
        color:color // restart see_result 內的 bg color
    }; 
    
  sendToStorage(result); // 儲存
  renderStatus(result);
};

// 更新 dee_result 的 status
function renderStatus(result){
    let condition= result.condition;
    let color =  result.color;
    let BMI =  result.BMI;
    // console.log(condition)
    // alert(color)
    see_result.classList.add('d-none'); // restart 後要去掉 d-none
    lastresult.classList.remove('d-none');
    resulText.textContent = BMI
    resultstatus.textContent = condition
    restart.style['background-color'] = color;
    resulText.style['color'] = color;
    resultstatus.style['color'] = color;
    resultNumber.style['color'] = color;
    resultNumber.style['border'] = `6px solid ${color}`;
 
}

// 重新開始
function restartcal(){
    lastresult.classList.add('d-none');
    see_result.classList.remove('d-none');
}

// 清除單一
function clearSingledata(e){
    console.log(e)
    let pathf = e.path[0].classList;
    let paths = e.path[1].classList;
    let count;
    let get = false;
    if (String(pathf).includes('clearOne')) {
        count = pathf[1]
        get = true;
    }
    else if (String(paths).includes('clearOne')) {
        count = paths[1]
        get = true;
    }
    if(get === true){
        dataAry.splice(dataAry.length-count-1,1)
        localStorage.setItem('bmiList',JSON.stringify(dataAry))
        renderRecordList()
    }

}


// 清除所有紀錄
function clearAlldata(){
    localStorage.clear();
    dataAry=[];
    renderRecordList()
}
