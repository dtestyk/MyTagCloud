javascript:(function(){
document
.elementFromPoint(0,innerHeight-1)
.value = document
.querySelector('title')
.innerText
.toLowerCase()
.replace(/[^0-9a-z]*([0-9a-z]+)[^0-9a-z]*/g,' $1 ')
.replace(/ +/g,' ')
.trim()
.split('javascript').join('js')
.split('featuring').join('feat')
}())