import React, { Component } from 'react'

class Card extends Component {
  constructor() {
    super()
    this.state = {
      open: true
    }
  }


  toggleOpen = () => {
    this.setState({ open: !this.state.open })
  }


  render() {
    const { title, children, icon, dropDown } = this.props

    return <div className={(this.state.open === true ? "card" : "card--closed")} >
      <React.Fragment>
        {title && 
          <div className="card__strip">
            <div className="card__strip-title">{icon ? icon : ""} {title}</div>
            {(dropDown !== false) &&
              <div className="card__strip-chevron" onClick={this.toggleOpen}>
                <span style={{display: (this.state.open === false ? "none" : "inline") }}>
                  <span className="fas fa-chevron-up" />
                </span>
                <span style={{display: (this.state.open === true ? "none" : "inline") }}>
                  <span className="fas fa-chevron-down" />
                </span>
              </div>
            }
            {dropDown === false &&
              <div></div>
            }
          </div>
        }
        
        <div className="card__content">
          {children}
        </div>
      </React.Fragment>
    </div>
  }
}

export default Card