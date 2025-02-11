import { useContext, useEffect } from 'react'
import { AvatarContext } from './store/context'
import AvatarNice, { genConfig } from 'react-nice-avatar'
import { actions } from './store/reducer'

export default function AvatarContainer({ className, ...rest }) {
  const { state, dispatch } = useContext(AvatarContext)
  const { avatar } = state.user

  const config = genConfig(avatar)

  useEffect(() => {
    dispatch({ type: actions.UPDATE_AVATAR, payload: { ...avatar } })
  }, [])

  return <AvatarNice className={className} {...config} {...rest} />
}
