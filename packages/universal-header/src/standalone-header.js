import Header from './containers/header'
import PropTypes from 'prop-types'
import React from 'react'
import wellDefinedPropTypes from './constants/prop-types'
import { configureStore } from './store'
import { getAccessToken } from './actions/auth'
import { Provider } from 'react-redux'

export default class StandaloneHeader extends React.PureComponent {
  static propTypes = {
    ...wellDefinedPropTypes.context.propTypes,
    pathname: PropTypes.string,
  }
  static defaultProps = {
    ...wellDefinedPropTypes.context.defaultProps,
    pathname: '',
  }

  constructor(props) {
    super(props)
    this.store = configureStore()
  }

  componentDidMount() {
    this.store.dispatch(getAccessToken(null, this.props.branch))
  }

  render() {
    const { isLinkExternal, ...passThrough } = this.props // eslint-disable-line
    return (
      <Provider store={this.store}>
        <Header {...passThrough} isLinkExternal={true} />
      </Provider>
    )
  }
}