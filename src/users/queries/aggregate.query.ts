export const usersWithRating = [
  {
    $project: {
      _id: {
        $toString: '$_id',
      },
      nickname: 1,
      firstname: 1,
      lastname: 1,
      avatar_url: 1,
    },
  },
  {
    $lookup: {
      from: 'votes',
      localField: '_id',
      foreignField: 'profile',
      as: 'votes',
    },
  },
  {
    $project: {
      _id: 1,
      nickname: 1,
      firstname: 1,
      lastname: 1,
      avatar_url: 1,
      rating: {
        $sum: '$votes.vote',
      },
    },
  },
];
