
import React from 'react'
import { connect } from 'react-redux'
import { queryStocks } from '../actions/stockActions'
import SearchResults from './SearchResults'

class Search extends React.Component {
  constructor() {
    super()

    this.state = {
      removeResults: true
    }

    this.handleInput = this.handleInput.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.getSearchComponent = this.getSearchComponent.bind(this)
  }

  handleInput() {
    this.setState({ removeResults: false })
    this.queryUnlessBlank()
  }

  handleBlur() {
    setTimeout(()=>{ this.setState({ removeResults: true }) }, 250)
  }

  handleFocus() {
    this.queryUnlessBlank()
  }

  render() {
    const stockSearch = this.props.stockSearch
    const searchComponent = this.getSearchComponent(stockSearch)

    return (
      <div className="ui search" >
        <div className="ui input">
          <input

            className="prompt"
            icon='search'
            placeholder='Search...'

            type='search'
            ref='search'
            autoComplete='off'
            onChange={ this.handleInput }
            onFocus={ this.handleFocus }
            onBlur={ this.handleBlur }
          />
        </div>

        { searchComponent }
      </div>
    )
  }

  clearQuery(){
    this.refs.search.value = ''
  }

  queryUnlessBlank() {
    const query = this.refs.search.value
    if(query !== ''){
      this.setState({ removeResults: false })
      this.props.queryStocks(query)
    } else {
      this.setState({ removeResults: true })
    }
  }

  getSearchComponent(stockSearch){
    let component = null

    if(!this.state.removeResults){
      component = (
        <div>
          {
            stockSearch.map((stock, i) => {
              return <SearchResults key={i} clearQuery={this.clearQuery.bind(this)} ticker={ stock.ticker } company_name={ stock.name } />
            })
          }
        </div>
      )
    }

    return component
  }
}

const mapStateToProps = (state) => {
  return {
    stockSearch: state.search
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryStocks: function(query) {
      let action = queryStocks(query)
      dispatch( action )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
