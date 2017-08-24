import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import { getFavoritePlanets } from '../actions/planetActions';

class Favorites extends Component {

  componentWillMount() {
    this.props.getFavoritePlanets();
  }

  render() {
    const { favoritePlanets, isFavoritePlanetsRequesting } = this.props;
    return (
      <div className="page-content">
        {
          isFavoritePlanetsRequesting || !favoritePlanets ? (
            <div className="card-loading"><Spinner color="#9e4f60" name='double-bounce' /></div>
          ) : (
              <div className="favorites__list">
                {
                  favoritePlanets.map((planet) => {
                    return (
                      <div className="favorites__list__item" key={planet.id}>
                        <div className="favorites__list__item__name">{planet.name}</div>
                      </div>
                    )
                  })
                }
              </div>
            )
        }

      </div>
    )
  }
}

export default connect((state) => ({
  favoritePlanets: state.planet.favoritePlanets,
  isFavoritePlanetsRequesting: state.planet.isFavoritePlanetsRequesting,
}), { getFavoritePlanets })(Favorites);
