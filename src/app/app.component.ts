import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public file:any
  audioObj=new Audio();
  audioEvents=[
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];
  files=[
   
    {
      ul:'./assets/two.mp3',
      name:'My Song1'
      },
      {
        ul:'./assets/three.mp3',
        name:'My Song2'
        },
        {
          ul:'./assets/four.mp3',
          name:'My Song3'
          },

  ];
  currentTime='00:00:00';
  duration='00:00:00';
  seek=0;
  streamObserver(ul){
    return new Observable(observer=>{
      this.audioObj.src=ul;
      this.audioObj.load();
      this.audioObj.play();
      
      const handler=(event:Event)=>
      {
        console.log(event);
        this.seek=this.audioObj.currentTime;
        this.duration=this.timeFormat(this.audioObj.duration);
    this.currentTime=this.timeFormat(this.audioObj.currentTime);

      }
      this.addEvent(this.audioObj,this.audioEvents,handler)

      return ()=>
      {
        this.audioObj.pause();
        this.audioObj.currentTime=0;
        this.removeEvent(this.audioObj,this.audioEvents,handler);
      }
    })

  }
  addEvent(obj,events,handler){
    events.forEach(event=>{
      obj.addEventListener(event,handler);

    });

  }
  removeEvent(obj,events,handler){
    events.forEach(event=>{
      obj.removeEventListener(event,handler);

    });

  }
  // setSeekTo(event)
  // {
  //   this.audioObj.currentTime=event.target.value;
  // }
  setVolume(ev)
  {
    this.audioObj.volume=ev.target.value;
    console.log(ev.target.value);
  }

  openFile(ul){
    this.streamObserver(ul).subscribe(event=>{});
    console.log(ul);

  }

  play()
  {
    this.audioObj.play();
   console.log("Clicked on Play Button")
  }
  pause(){
    this.audioObj.pause();
    console.log("Clicked on Pause Button")
  }
  stop(){
    this.audioObj.pause();
    this.audioObj.currentTime =0;
    console.log("Clicked on Stop Button")
  }
  timeFormat(time,format="HH:mm:ss"){
    const momentTime=time*1000
    return moment.utc(momentTime).format(format);

  }
  
}
