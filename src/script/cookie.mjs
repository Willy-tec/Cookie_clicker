class Cookie{
    constructor(){
      console.log("cookie")
      this.nb = 0;
      this.nbSec = 0;
      this.nbMilli = 0;
      this.timing = 60;
      this.AutoClick= 0;
      this.GrandMa=0;
      this.Cuisine=0;
      this.Fabrique=0;
      this.Usine=0;
      this.MegaFactory=0;
      this.Bonus = 1;
      this.inc = 1;
    }
    setCookieSec(){
      this.nbSec = (this.AutoClick*0.1) + (this.GrandMa*1) + (this.Cuisine*2) + (this.Fabrique * 5) + (this.Usine * 10) + (this.MegaFactory * 20)
      
      if(isNaN(this.nbSec)) this.nbSec = 0
      //this.nbSec= this.nbSec.toFixed(1)
      this.nbMilli = this.nbSec/1000;
      if(isNaN(this.nbMilli)) this.nbMilli= 0
    }
    setInc(){
      this.inc = this.Bonus * 1
    }
  }
  
  export {Cookie}