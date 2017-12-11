import React from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {saveUser,fetchUser,updateUser} from '../actions/actions';
import {Redirect} from 'react-router';


// ALL FETCH PARTS ARE FOR EDITING USERS BUT I DIDN'T MANAGE TO GET IT WOKRING 

class UserForm extends React.Component {
  // THIS IS INITIAL STATE
   state = {  
    _id: this.props.user ? this.props.user._id : null,
    first: this.props.user ? this.props.user.first : '',
    last: this.props.user ? this.props.user.last : '',
    email: this.props.user ? this.props.user.email : '',    
    errors: {},
    loading: false,
    done :false
  }

  componentWillReceiveProps = (nextProps) =>{
    this.setState({
      _id: nextProps.user._id,
      first: nextProps.user.first,
      last: nextProps.user.last,
      email: nextProps.user.email

    })
  }
    componentDidMount = () =>{
    // DISPATCH ACTION IF WE HAVE ID PROVIDED IN ROUTE
    if(this.props.match.params._id){
      this.props.fetchUser(this.props.match.params._id);
    }
  }


 // WE SET STATE FOR FIELD THAT WE GET FROM TARGET NAME TO EQUAL TO TARGET VALUE
   handleChange = (e) => {
    // DO ONLY WHERE THERE IS SOMETHING IN ERRORS OBJECT FOR THIS FIELD
    if (!!this.state.errors[e.target.name]) {
      // CLONING ERRORS TO LOCAL VARIABLE BY ASSIGNING state errors to empty object.
      let errors = Object.assign({}, this.state.errors);
      // DELETE VALIDATION MESSAGE IF USER CHANGES FIELD
      delete errors[e.target.name];
      // SET STATE AND ADD ERRORS
      this.setState({
        [e.target.name]: e.target.value,
        errors
      });
    } else {
        this.setState({ [e.target.name]: e.target.value });
    }
  }

  handleSubmit = (e) =>{
    // TO PREVENT DEFAULT FORM SUBMIT BEHAVIOUR
    e.preventDefault();

   // VALIDATION
   // local variable errors
    let errors ={};
    if(this.state.first ==='') errors.first ="First name can't be empty";
    if(this.state.last ==='') errors.last ="Last name can't be empty";
    if(this.state.email ==='') errors.email ="Please enter email - I mean this is a mailing list duh";
    // SET OUR STATE TO THESE ERRORS ABOVE THEN USING CLASSNAMES WE ADD ERROR INFO TO OUR FORM
    this.setState({errors});

    // IF ERRORS OBJECT IS EMPTY OUR FORM IS VALID 
    const isValid = Object.keys(errors).length === 0


    if (isValid) {
      const { _id,first, last, email } = this.state;
      this.setState({ loading: true });
      // CHECK IF ID IS NOT NULL AND DISPATCH UPDATE USER ACTION - pass id first last and email to it
      if(_id){
         this.props.updateUser({_id,first,last,email}).then(
        // SUCCES FUNCTION - HERE WE CONFIRM THAT THE FORM WAS DONE SUCCESSFULLY
        ()=>{this.setState({done:true})},
         (err) => err.response.json().then(({errors}) => this.setState({ errors, loading: false }))
        );
      }else{
          // IF THE FORM IS VALID WE CALL THE PROPS saveUser thunk action and pass user data to it
       this.props.saveUser({first,last,email}).then(
        // SUCCES FUNCTION - HERE WE CONFIRM THAT THE FORM WAS DONE SUCCESSFULLY
        ()=>{this.setState({done:true})},
         (err) => err.response.json().then(({errors}) => this.setState({ errors, loading: false }))
        );
      }
    }
  }
  render() {
    const form =(
      <form className={classnames('ui','form',{loading:this.state.loading})} onSubmit={this.handleSubmit}>
          <h1>Add new user</h1>


          {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

          <div className={classnames('field',{error:!!this.state.errors.first})}>
            <label htmlFor="first"> First Name : </label>
              <input 
                name="first" 
                value={this.state.first} 
                onChange={this.handleChange.bind(this)} 
                id="first"
              /> 
            <span>{this.state.errors.first}</span>
          </div>

           <div className={classnames('field',{error:!!this.state.errors.last})}>
            <label htmlFor="last"> Last Name : </label>
              <input 
                name="last" 
                value={this.state.last} 
                onChange={this.handleChange} 
                id="last"
              /> 
            <span>{this.state.errors.last}</span>
          </div>

           <div className={classnames('field',{error:!!this.state.errors.email})}>
            <label htmlFor="email" > Email : </label>
              <input 
                name="email" 
                value={this.state.email} 
                onChange={this.handleChange} 
                id="email"
              /> 
            <span>{this.state.errors.email}</span>
          </div>

          <div>
            <button className="ui primary button">SAVE</button>
          </div>
      </form>
      )

    return (
        <div>
          { this.state.done ? <Redirect to="/users" /> : form }
        </div>      
    );
  }
}


function mapStateToProps(state, props) {
  if (props.match.params._id) {
    return {
      user: state.users.find(item => item._id === props.match.params._id)
    }
  }

  return { user: null };
}

export default connect(mapStateToProps, { saveUser, fetchUser, updateUser })(UserForm);