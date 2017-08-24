import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-icons-kit';
import { likeAdd } from 'react-icons-kit/metrize/likeAdd';
import { info } from 'react-icons-kit/metrize/info';
import { arrowCurveRecycle } from 'react-icons-kit/metrize/arrowCurveRecycle';
import Spinner from 'react-spinkit';
import numeral from 'numeral';
import { getRandomPlanet, addFavoritePlanets } from '../actions/planetActions';
import { buildRandomPlanet } from '../selectors';

function formatter(value) {
  return numeral(value).format('0.0a')
}

class Home extends Component {

  componentWillMount() {
    this._addFavorite = this._addFavorite.bind(this);
    this._getRandomPlanet = this._getRandomPlanet.bind(this);
    this._openPlanetInfos = this._openPlanetInfos.bind(this);
    this._getRandomPlanet();
  }

  _addFavorite() {
    this.props.addFavoritePlanets(this.props.randomPlanet);
  }

  _getRandomPlanet() {
    this.props.getRandomPlanet();
  }

  _openPlanetInfos() {
    alert('Not implemented yet');
  }

  render() {
    const { randomPlanet, isRandomPlanetRequesting } = this.props;
    return (
      <div className="page-content">
        {
          !randomPlanet ? (
            <div className="card-loading"><Spinner color="#9e4f60" name='double-bounce' /></div>
          ) : (
              <div className="card">
                <div className="card-info">
                  <div className="card-info_wrapper">
                    <div className="card-info__image" />
                    <div className="card-info__title">{randomPlanet.name}</div>
                  </div>
                  <div className="card-info__details">
                    <div className="card-info__details__item">
                      <div className="card-info__details__item__key">POPULATION</div>
                      <div className="card-info__details__item__value">{formatter(randomPlanet.population)}</div>
                    </div>
                    <div className="card-info__details__item">
                      <div className="card-info__details__item__key">TERRAIN</div>
                      <div className="card-info__details__item__value">{randomPlanet.terrain}</div>
                    </div>
                    <div className="card-info__details__item">
                      <div className="card-info__details__item__key">MOVIES</div>
                      <div className="card-info__details__item__value">{randomPlanet.filmCount.toString().padStart(2, '0')}</div>
                    </div>
                  </div>
                </div>
                <div className="card-actions">
                  <div className="card-actions__button" onClick={this._addFavorite}><Icon size={50} icon={likeAdd} /></div>
                  <div className="card-actions__button" onClick={this._getRandomPlanet}><Icon size={72} icon={arrowCurveRecycle} /></div>
                  <div className="card-actions__button" onClick={this._openPlanetInfos}><Icon size={50} icon={info} /></div>
                </div>
                {isRandomPlanetRequesting ? <div className="card-loading"><Spinner color="#9e4f60" name='double-bounce' /></div> : null}
              </div>
            )
        }
      </div>
    )
  }
}

export default connect((state) => ({
  randomPlanet: buildRandomPlanet(state),
  isRandomPlanetRequesting: state.planet.isRandomPlanetRequesting,
}), { getRandomPlanet, addFavoritePlanets })(Home);
