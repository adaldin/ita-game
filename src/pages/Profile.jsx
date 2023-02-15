import user from '../components/profile/mocks/user.json'
import activities from '../components/profile/mocks/activities.json'
import { FooterMenu, Navbar } from '../components'
import folder from '../assets/images/rocket-dynamic.png'
import rocket from '../assets/images/rocket-dynamic.png'
import sun from '../assets/images/sun-dynamic.png'
import EarnBadges from '../components/profile/EarnBadges'
import PendingBadges from '../components/profile/PendingBadges'
import CardProfile from '../components/profile/CardProfile'

// TODO:
// LOGIC: refactor into smaller components/ endpoint Itaawards with images/Protecte Route
// UI:Grid on 'Insignias Ganadas' Cards


function Profile() {
  const totalPoints = activities
    .filter(activity => activity.doneBy._id === user._id)
    .map(doneActivities => doneActivities.typeId.points)
    .reduce((acc, current) => acc + current, 0)

  // data from the user.json
  const data = {
    name: user.name,
    surname: user.surname,
    framework: user.framework,
    points: totalPoints,
    activities: user.activities,
    multiple: Math.ceil(user.ITApoints / 50) * 50
  }

  // Fake user to obtain SVG and Data for looping
  const fakeUsers = {
    ITAawards: [
      { name: user.ITAawards[0], img: sun, text: '+5 dudas' },
      { name: user.ITAawards[1], img: folder, text: '+3 wikis' },
      { name: user.ITAawards[2], img: rocket, text: '+2 explicaciones' }
    ],
    pendingAwards: ['Coordinator']
  }

  return (
    <>
      <Navbar>Perfil</Navbar>
      <div className="h-screen pt-10 mb-15">
        <div className="p-5 bg-slate-100">
          <CardProfile data={data} />
          <EarnBadges fakeUsers={fakeUsers} />
          <PendingBadges fakeUsers={fakeUsers} />
        </div>
        <FooterMenu />
      </div>
    </>
  )
}
export default Profile
