import React, {Component} from 'react';
import './App.css';
import firebase from './firebase.js';




class App extends Component {

  constructor(){
    super();
    this.state = {
      task: '',
      items : [],
      user: '',
      date: new Date().toLocaleDateString(),
      open:false


    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleChange(e){
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
   
    const item = {
      title: this.state.task,
    }
    itemsRef.push(item);
    this.setState({
      task: ''
    });
  }
  changeUser(e){
    this.setState({
      [e.target.user]:e.target.value
    });
  }


  

  componentDidMount(){
    // if successful, we get the values inside the array taskRef and display
    const itemsRef = firebase.database().ref('items');
      itemsRef.on('value', (snapshot) => {
        let items = snapshot.val();
        let newState = [];
        for (let item in items) {
          newState.push({
            id: item,
            title : items[item].title,
            
          });
        }
        
        this.setState({
          items: newState
          
        });
   
      });
  }

  removeItem(itemID){
    const itemsRef = firebase.database().ref(`/items/${itemID}`);
    itemsRef.remove();
  }

  render(){
    
    function showTime(){
      var date = new Date();
      var h = date.getHours(); // 0 - 23
      var m = date.getMinutes(); // 0 - 59
      var s = date.getSeconds(); // 0 - 59
      var session = "AM";
      var greeting = "Good Morning";
      
      if(h === 0){
          h = 12;
      }
      
      if( 18 > h > 12){
          h = h - 12;
          session = "PM";
          greeting = "Good Afternoon";
      }
      if( h > 18){
        h = h-12;
        greeting = "Good Evening";
        session = "PM"
      }
     
      
      h = (h < 10) ? "0" + h : h;
      m = (m < 10) ? "0" + m : m;
      s = (s < 10) ? "0" + s : s;
      
      var time = h + ":" + m + ":" + s + " " + session;
      document.getElementById("MyClockDisplay").innerText = time;
      document.getElementById("MyClockDisplay").textContent = time;
      document.getElementById("GreetingDisplay").innerText = greeting;
      
      setTimeout(showTime, 1000);
      
  }
  
  showTime();
  
    return(
      <body>
      
          <h2> {this.state.date} </h2>
      <div>
        
        <form inline onSubmit = {this.handleSubmit}>
        <br></br>
        <h1> What is your goal today? </h1>
        <br></br>
        <input className = "container" type = "text"  name = "task" placeholder = "Please insert a task.." onChange =  {this.handleChange} value = {this.state.task}/>
        <button class= "btn btn-small btn-gray btn-radius" > add task </button>   
        </form>
        <br></br>
      {this.state.items.map((item) =>{
        return(
          <div class = "fade-in form-check">
           <h1>
           {item.title}
           </h1>
           <button class ="btn btn-small btn-gray btn-radius" onClick = {() => this.removeItem(item.id)}> remove </button>
           
            
            </div>
        )
      })}
  
      </div >
      
   
  
      </body>

     
    );



  }

}

export default App;