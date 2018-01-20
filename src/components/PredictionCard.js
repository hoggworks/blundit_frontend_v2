import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Icons from './../utilities/Icons'
import TimeFormatting from './../utilities/TimeFormatting'


class PredictionCard extends Component {
  getCategoryIcon = category => (category && category.name) ? <span className={Icons.get('category_'+category.id)} /> : <span />

  getStatusClass = status => {
    if (!status) status = "unknown"
    
    return "prediction-card__status--" + status
  }


  formatStatusText = status => {
    if (!status) status = "unknown"
    const statuses = { 
      "unknown": "unknown",
      "in-progress": "voting in progress",
      "true": "true",
      "false": "false",
    }

    return statuses[status].toUpperCase()
  }


  validStatusType = status => {
    if (!status) status = "unknown"

    const valid = ["unknown", "in-progress", "true", "false"].find((element) => element === status)
    if (valid) return status
  }


  voteStatus = (voteable_at = this.props.voteable_at, status = this.props.status) => {
    if (!voteable_at) return null
    const voteable = new Date(voteable_at)
    const now = new Date()

    if (status !== 0) return "closed"
    if (voteable < now) return "open"
    if (voteable >= now) return "pending"
  }


  timeToVote = (voteable_at = this.props.voteable_at) => {
    return TimeFormatting.prettyTimeRemaining(voteable_at)
  }


  render() {
    const {
      alias,
      title,
      status,
      description,
      categories,
      experts_agree,
      experts_disagree,
      evidence_for,
      evidence_against,
      votes_yes,
      votes_unsure,
      votes_no,
      comments_count,
      bookmarks_count
    } = this.props;

    return <Link to={"/predictions/"+alias} className="hidden-link">
      <div className="prediction-card">
        {this.validStatusType(status) && <div className={this.getStatusClass(status)}>{this.formatStatusText(status)}</div>}

        <div className="prediction-card__title">
          {title && <div className="prediction-card__title-text">{title}</div>}
        </div>
        <div className="prediction-card__description">
          {description && <div className="prediction-card__description-text">{description}</div>}
          {categories && <div className="prediction-card__description-category">{this.getCategoryIcon(categories[0])}</div>}
        </div>
        <div className="prediction-card__supporting">
          <div className="prediction-card__supporting__experts">
            <div className="prediction-card__supporting__experts-agree">
              <span className="icon fa fa-user-circle" />
              {experts_agree ? experts_agree : 'N/A'}
            </div>
            <div className="prediction-card__supporting__experts-disagree">
              <span className="icon fa fa-user-circle" />
              {experts_disagree ? experts_disagree: 'N/A'}
            </div>
          </div>
          <div className="prediction-card__supporting__evidence">
            <div className="prediction-card__supporting__evidence-against">
              <span className="icon fa fa-file-alt" />
              {evidence_against ? evidence_against : 'N/A'}
            </div>
            <div className="prediction-card__supporting__evidence-for">
              <span className="icon fa fa-file-alt" />
              {evidence_for ? evidence_for : 'N/A'}
            </div>
          </div>
        </div>
        <div className="prediction-card__bottom">
          <div className="prediction-card__bottom__votes">
            {this.voteStatus(this.props.voteable_at, this.props.status) === "open" &&
              <React.Fragment>
                <div className="prediction-card__bottom__vote-now">
                  Vote Now: 
                  <span className="fas fa-check icon"></span>
                  <span className="fas fa-question icon"></span>
                  <span className="fas fa-times icon"></span>
                </div>
              </React.Fragment>
            }
            {this.voteStatus(this.props.voteable_at, this.props.status) === "pending" &&
              <React.Fragment>
                <div className="prediction-card__bottom__vote-in">Vote In {this.timeToVote(this.props.voteable_at)}</div>
              </React.Fragment>
            }
            {this.voteStatus(this.props.voteable_at, this.props.status) === "closed" &&
              <React.Fragment>
              <div className="prediction-card__bottom__votes-yes">
                <span className="icon fas fa-check" />
                {votes_yes ? votes_yes : 'N/A'}
              </div>
              <div className="prediction-card__bottom__votes-unsure">
                <span className="icon fas fa-question" />
                {votes_unsure ? votes_unsure : 'N/A'}
              </div>
              <div className="prediction-card__bottom__votes-no">
                <span className="icon fas fa-times" />
                {votes_no ? votes_no : 'N/A'}
              </div>
              </React.Fragment>
            }
          </div>
          <div className="prediction-card__bottom__meta">
            <div className="prediction-card__bottom__meta-comments">
              <span className="icon far fa-comment" />
              {comments_count ? comments_count : 'N/A'}
            </div>
            <div className="prediction-card__bottom__meta-bookmarks">
              <span className="icon far fa-bookmark" />
              {bookmarks_count ? bookmarks_count : 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </Link>
  }
}

export default PredictionCard