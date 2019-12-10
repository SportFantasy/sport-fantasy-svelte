import UserWidget from '../src/user/UserWidget.svelte'

export default { title: 'User/UserWidget' }


const USER_DUMMY_DATA = {
    displayName: 'Testing Name',
    email: 'testing@griddynamics.com',
    id: '11111111111111111',
    createdAt: 1575456896893,
    lastLoginAt: 1575457896893,
}

export const withoutUserProp = () => ( {
    Component: UserWidget,
} )

export const withUserProp = () => ( {
    Component: UserWidget,
    props: {
        user: USER_DUMMY_DATA,
        confirmedGamesNo: 10,
        unConfirmedGamesNo: 20,
    },
} )
