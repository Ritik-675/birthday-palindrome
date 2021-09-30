var inputDate = document.querySelector("#dob");
var checkButton = document.querySelector(".check_button");
var output = document.querySelector(".output") ;
var holder = document.querySelector(".hold") ;

function stringRev(text) {
  return text.split("").reverse().join("");
}

function checkPalindrome(text) {
  return text === stringRev(text);
}

function getDateAsString(dateNum) {
  var dateInString = { day: "", month: "", year: "" };
  if (dateNum.day < 10) {
    dateInString.day = "0" + dateNum.day.toString();
  } else {
    dateInString.day = dateNum.day.toString();
  }
  if (dateNum.month < 10) {
    dateInString.month = "0" + dateNum.month.toString();
  } else {
    dateInString.month = dateNum.month.toString();
  }
  dateInString.year = dateNum.year.toString();

  return dateInString;
}

function dateVariations(date) {
  var variationsArray = [];
  variationsArray[0] = date.day + date.month + date.year;
  variationsArray[1] = date.month + date.day + date.year;
  variationsArray[2] = date.year + date.month + date.day;
  variationsArray[3] = date.day + date.month + date.year.slice(-2);
  variationsArray[4] = date.year.slice(-2) + date.day + date.month;
  variationsArray[5] = date.year.slice(-2) + date.month + date.day;
  return variationsArray;
}

function checkPalindromeForAllVariations(text) {
  var checkPalindromeElements = dateVariations(text);
  var flag=false;
  for (let i = 0; i < checkPalindromeElements.length; i++) {
    if(checkPalindrome(checkPalindromeElements[i])){
        flag=true ;
        break;
    }
  }
  return flag ;
}

// function checkPalindromeForAllVariations(text) {
//   var checkPalindromeElements = dateVariations(text);
//   var palindromeList = [];
//   for (let i = 0; i < checkPalindromeElements.length; i++) {
//     var result = checkPalindrome(checkPalindromeElements[i]);
//     palindromeList.push(result) ;
//   }
//   return palindromeList ;
// }

function isLeapYear(year)
{
    if(year%400===0)
    {
        return true ;
    }
    else
    {
        if(year%100===0)
        {
            return false ;
        }
        else{
            if(year%4===0)
            {
                return true ;
            }
            return false ;
        }
    }
    return false ; 
}

function getnextDate(date){
    var day=date.day+1 ;
    var month=date.month ;
    var year = date.year ;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31] ;
    if(month===2)
    {
        if(isLeapYear(year))
        {
            if(day>29)
            {
                day=1;
                month++;
            }
        }
        else{
            if(day>28)
            {
                day=1;
                month++;
            }
        }
    }
    else{
        if(day>daysInMonth[month-1])
        {
            day=1;
            month++;
        }
    }
    if(month>12){
        month=1;
        year++;
    }
    return{
        day: day ,
        month: month,
        year: year
    };
}
function getNextPalindromeDate(date)
{
 var count=0 ;
 var nextDate=getnextDate(date) ;
 while(1)
 {
    count++;
    var isPalindrome = (checkPalindromeForAllVariations(getDateAsString(nextDate)));
    if(isPalindrome)
    {
        break ;
    }
    nextDate=getnextDate(nextDate) ;
 }
 return [count,nextDate] ;
}

function clickHandler(){
    var bdayString = inputDate.value ;
    holder.style.display='block' ;
    if(bdayString!="")
    {
        var listOfDate = bdayString.split('-') ; 
        var date={
            day: Number(listOfDate[2]) ,
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        }
        if(checkPalindromeForAllVariations(getDateAsString(date)))
        {
            output.innerText="Your Birthday is palindrome 🎉🎊🥳" ;
        }
        else{
            var next=getNextPalindromeDate(date);
            output.innerText="Your Birthday is not a palindrome😞😞😞\nNearest palindrome date is after "+next[0] +"days  on "+ next[1].day+"-"+next[1].month+"-"+next[1].year ;
        }
    }
}
checkButton.addEventListener("click",clickHandler)
holder.style.display='none' ;