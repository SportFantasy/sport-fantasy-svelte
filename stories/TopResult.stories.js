import SingleTopResult from '../src/home/SingleTopResult.svelte'

export default { title: 'TopResult/SingleTopResult' }


const USERS_DUMMY_DATA = [{
    displayName: 'Testing Name',
    email: 'testing@griddynamics.com',
    totalScore: 20,
}, {
    displayName: 'Testing Name 2',
    email: 'testing2@griddynamics.com',
    totalScore: 14,
}, {
    displayName: 'Testing Name 3',
    email: 'testing3@griddynamics.com',
    totalScore: 10,
}]

export const withoutUserProp = () => ( {
    Component: SingleTopResult,
} )

export const withUsersProp = () => ( {
    Component: SingleTopResult,
    props: {
        usersWithScores: USERS_DUMMY_DATA,
        title: 'Title',
    },
} )
