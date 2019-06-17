import React, {Component} from 'react';
import './App.css';
import firebase from './firebase.js';




class App extends Component {

  constructor(){
    super();
    this.state = {
      task: '',
      items : [],
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
  
    return(
      <body>
      <div class   = "center"> 
          <h2> {this.state.date} </h2>
          <br></br>
      <div>
        <ul>
        <form inline onSubmit = {this.handleSubmit}>
        <h1> What is your goal today? </h1>
        <br></br>
        <input className = "container" type = "text"  name = "task" placeholder = "Please insert a task.." onChange =  {this.handleChange} value = {this.state.task}/>
        <button class= "btn btn-secondary" > add task </button>   
        </form>
        <br></br>
      {this.state.items.map((item) =>{
        return(
          <div class = "fade-in form-check">
           <h1>
           {item.title}
           <button class ="btn btn-danger" onClick = {() => this.removeItem(item.id)}> x </button>
           </h1>
            
            </div>
        )
      })}
      </ul>
      </div >
      
      </div>
  
      </body>

     
    );



  }

}

export default App;
