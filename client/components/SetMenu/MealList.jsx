import React, { Component } from 'react';
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { addAMealToMenu, getPaginatedMeals } from '../../actions/setMenuActions';


class MealList extends Component{
    
    state = {
      currentPage: 0
    }

    componentDidMount(){
      this.props.getPaginatedMeals(this.state.currentPage);
    }

    handleNext = () => {
      if(this.props.pages -1 > this.state.currentPage){
        this.props.getPaginatedMeals(this.state.currentPage + 1);
        this.setState((prevState) => ({ currentPage: prevState.currentPage + 1}));
      }
    }
    handlePrevious = () => {
      if(this.state.currentPage > 0){
        this.props.getPaginatedMeals(this.state.currentPage - 1);
        this.setState((prevState) => ({ currentPage: prevState.currentPage - 1}));
      }
    }
    render(){
      let numOfPage;
      let pageNumArr = [];
      numOfPage = this.props.pages || 0;
      for (let pageNum = 0; pageNum < numOfPage ; pageNum++) {
        pageNumArr.push(pageNum + 1);
      }
    return (
        <div className="contain-set-menu-meal-table">
            <div className="set-menu-table-headers">
                <p>Image</p>
                <p>Name</p>
                <p>Description</p>
                <p>Action</p>
            </div>
            {
                this.props.isLoading ? <div className='loading-spinner'>
                <Loader 
                    type="Circles"
                    color="#9D2401"
                    height="100"
                    width="100"
                />
                <h3 id='loader-text'>Fetching...</h3>  
                </div> :
                <div>
                    <div className="set-menu-table-body">
                      {this.props.meals.map(meal =>
                            <div key={ meal.id } className="set-menu-meal-item">
                                <img src={ meal.imageurl } alt="" />
                                <div className="food-title-desc">
                                    <p className="food-item-title">{ meal.name }</p>
                                    <p className="food-item-detail">{ meal.description }</p>
                                </div>
                                <div className="food-item-price">
                                &#8358;{ meal.price }
                                </div>
                                <div><button onClick={() => {
                                    this.props.addAMealToMenu({date:this.props.selectedDate, mealId:meal.id});
                                }} className="food-add-btn">Add to menu</button></div>
                            </div>
                      )}
                  </div>
                  <hr />
                    <div className='center pad-bottom'>
                      <span onClick={ () => { this.handlePrevious()}}><i className="fas fa-angle-double-left page-btn"></i></span>
                      { 
                        pageNumArr && pageNumArr.map(num => 
                          <span className={this.state.currentPage === num - 1 ? 'page-num current-page' : 'page-num'} key={num} onClick={() => {
                            this.props.getPaginatedMeals(num - 1);
                            this.setState(() => ({currentPage: num - 1}));
                          }
                        }>{num}</span>
                      )}
                      <span ><i className="fas fa-angle-double-right page-btn" onClick={ () => { this.handleNext()}}></i></span>
                    </div>
                </div> 
            
            }
        </div>
    );
}
}

const mapStateToProps = state => ({
    meals: state.setMenuReducer.paginatedMeals,
    isLoading: state.setMenuReducer.isLoading,
    selectedDate: state.setMenuReducer.selectedDate,
    count: state.setMenuReducer.count,
    pages: state.setMenuReducer.pages,
});

export default connect(mapStateToProps, { addAMealToMenu, getPaginatedMeals })(MealList)
