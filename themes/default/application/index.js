import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Helmet from 'react-helmet'
import Header from '../header'
import Sidebar from '../sidebar'
import Page from '../page'
import NotFound from '../not-found'
import Routes from '../routes'
import { ConfigContext } from '../context'
import { Wrapper, WrapperNav, WrapperPage } from './styles'

class App extends Component {
  render () {
    const {
      config,
      manifest,
    } = this.props

    return (
      <ConfigContext.Provider value={config}>
        <Wrapper>
          <Helmet
            defaultTitle={config.name}
            titleTemplate={`%s · ${config.name}`}
          >
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Overpass+Mono:300,700|Overpass:300,700,900"
            />
          </Helmet>

          <WrapperNav>
            <Sidebar navtree={manifest.navtree} />
          </WrapperNav>

          <WrapperPage>
            <Header manifest={manifest} />

            <Routes
              routes={manifest.files}
              componentPage={Page}
              component404={NotFound}
              socketUrl={`ws://${config.host}:${config.port}`}
            />
          </WrapperPage>
        </Wrapper>
      </ConfigContext.Provider>
    )
  }
}

export default withRouter(App)
