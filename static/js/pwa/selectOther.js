function CheckReligion(val){
     var element=document.getElementById('religion');
     if(val=='pick a color'||val=='others')
       element.style.display='block';
     else  
       element.style.display='none';
    }