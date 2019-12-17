export const getTopScoresLimited = (topScoresData, limitCount) => {
    const arr = Object.values(topScoresData)
    const processed = arr.map( (topScore) => {
        return {
            name: topScore.name,
            users: topScore.users.slice(0, limitCount),
        }
    })
    return processed
}
