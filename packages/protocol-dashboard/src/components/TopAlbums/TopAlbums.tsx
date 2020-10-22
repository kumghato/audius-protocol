import Loading from 'components/Loading'
import Paper from 'components/Paper'
import React, { useCallback } from 'react'
import { useTopAlbums } from 'store/cache/music/hooks'
import { formatShortNumber } from 'utils/format'

import styles from './TopAlbums.module.css'

const messages = {
  title: 'Top Albums'
}

type OwnProps = {}

type TopAlbumsProps = {}

const TopAlbums: React.FC<TopAlbumsProps> = () => {
  const { topAlbums } = useTopAlbums()
  const goToUrl = useCallback((url: string) => {
    window.open(url, '_blank')
  }, [])
  return (
    <Paper className={styles.container}>
      <div className={styles.title}>{messages.title}</div>
      <div className={styles.albums}>
        {!!topAlbums ? (
          topAlbums.map((p, i) => (
            <div
              key={i}
              className={styles.album}
              onClick={() => goToUrl(p.url)}
            >
              <div
                className={styles.artwork}
                onClick={() => goToUrl(p.url)}
                style={{
                  backgroundImage: `url(${p.artwork})`
                }}
              />
              <div className={styles.text}>
                <div className={styles.albumTitle}>{p.title}</div>
                <div className={styles.handle}>{p.handle}</div>
              </div>
              <div className={styles.plays}>
                {`${formatShortNumber(p.plays)} Plays`}
              </div>
            </div>
          ))
        ) : (
          <Loading className={styles.loading} />
        )}
      </div>
    </Paper>
  )
}

export default TopAlbums