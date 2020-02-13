import mongoose from 'mongoose';

const connectDB = () => {
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true})
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'MongoDB connection error'))
  db.once('open', ()=>{console.log('MongoDB connected')})
  return db
}
export { connectDB }

let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};

let chapters = {
  1: {
      id: 1,
      title: "Playing charcter and experience",
      userId: 1,
      sections: [
          {
            id: 0,
            title: "Why can't i make my own character",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse rhoncus, justo quis consequat dignissim, ipsum est lobortis lectus, faucibus blandit nunc neque eget tortor. Donec condimentum nibh sed est tristique aliquam. Donec eu nulla ultrices orci ultrices aliquet. Nulla eget rhoncus justo, at mattis enim. Proin finibus pharetra turpis eu sollicitudin. Morbi cursus elementum mauris, id porta dui convallis ac. Pellentesque vitae nulla felis. Fusce imperdiet ac urna ut dapibus. Mauris ut dictum dolor. Maecenas a eleifend enim. Vivamus malesuada accumsan venenatis. Praesent dapibus, arcu eu pharetra faucibus, nisl ligula tristique felis, dictum ullamcorper neque elit non enim. Vivamus efficitur dui eu erat gravida finibus. Etiam molestie lorem est. Suspendisse massa ipsum, sodales a sapien eu, sollicitudin efficitur urna. Morbi consectetur, est eu facilisis dictum, magna sapien congue justo, eget finibus nisi justo eu lacus. Mauris efficitur, libero eu scelerisque maximus, libero massa blandit sem, porta condimentum purus tortor sit amet ante. Aenean sit amet ligula eget ante euismod placerat. Aliquam eros augue, dapibus quis rutrum vel, aliquet vel sapien. Etiam at elit maximus dolor pulvinar ullamcorper vitae quis quam. Curabitur id diam odio. Maecenas quis dolor et arcu scelerisque venenatis. Mauris hendrerit sodales dignissim. Phasellus quis pharetra odio. Donec gravida tempus massa. Morbi dignissim nisl eros, at ornare ex tempor eget. Mauris sed nisl sem. Phasellus porta vestibulum dui vel convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper iaculis sapien, commodo laoreet turpis mollis vel. Donec eu imperdiet erat, at consequat metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer in magna laoreet, dignissim ligula eu, pretium dui. Morbi vestibulum arcu vel eros rutrum, id egestas dolor accumsan. Integer convallis pretium nisi ac lacinia. Nam egestas rutrum arcu sed tristique. Nunc pretium sapien quis sem ullamcorper rutrum. Cras varius nibh et ex auctor faucibus. Proin dolor nulla, efficitur id arcu et, dapibus suscipit ipsum."
          },
          {
            id: 1,
            title: "What class do i play",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse rhoncus, justo quis consequat dignissim, ipsum est lobortis lectus, faucibus blandit nunc neque eget tortor. Donec condimentum nibh sed est tristique aliquam. Donec eu nulla ultrices orci ultrices aliquet. Nulla eget rhoncus justo, at mattis enim. Proin finibus pharetra turpis eu sollicitudin. Morbi cursus elementum mauris, id porta dui convallis ac. Pellentesque vitae nulla felis. Fusce imperdiet ac urna ut dapibus. Mauris ut dictum dolor. Maecenas a eleifend enim. Vivamus malesuada accumsan venenatis. Praesent dapibus, arcu eu pharetra faucibus, nisl ligula tristique felis, dictum ullamcorper neque elit non enim. Vivamus efficitur dui eu erat gravida finibus. Etiam molestie lorem est. Suspendisse massa ipsum, sodales a sapien eu, sollicitudin efficitur urna. Morbi consectetur, est eu facilisis dictum, magna sapien congue justo, eget finibus nisi justo eu lacus. Mauris efficitur, libero eu scelerisque maximus, libero massa blandit sem, porta condimentum purus tortor sit amet ante. Aenean sit amet ligula eget ante euismod placerat. Aliquam eros augue, dapibus quis rutrum vel, aliquet vel sapien. Etiam at elit maximus dolor pulvinar ullamcorper vitae quis quam. Curabitur id diam odio. Maecenas quis dolor et arcu scelerisque venenatis. Mauris hendrerit sodales dignissim. Phasellus quis pharetra odio. Donec gravida tempus massa. Morbi dignissim nisl eros, at ornare ex tempor eget. Mauris sed nisl sem. Phasellus porta vestibulum dui vel convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper iaculis sapien, commodo laoreet turpis mollis vel. Donec eu imperdiet erat, at consequat metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer in magna laoreet, dignissim ligula eu, pretium dui. Morbi vestibulum arcu vel eros rutrum, id egestas dolor accumsan. Integer convallis pretium nisi ac lacinia. Nam egestas rutrum arcu sed tristique. Nunc pretium sapien quis sem ullamcorper rutrum. Cras varius nibh et ex auctor faucibus. Proin dolor nulla, efficitur id arcu et, dapibus suscipit ipsum."
          }        
      ]
  },
  2: {
      id: 2,
      title: "Second chapter",
      userId: 1,
      sections: [
          {
            id: 0,
            title: "Why can't i make my own character",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse rhoncus, justo quis consequat dignissim, ipsum est lobortis lectus, faucibus blandit nunc neque eget tortor. Donec condimentum nibh sed est tristique aliquam. Donec eu nulla ultrices orci ultrices aliquet. Nulla eget rhoncus justo, at mattis enim. Proin finibus pharetra turpis eu sollicitudin. Morbi cursus elementum mauris, id porta dui convallis ac. Pellentesque vitae nulla felis. Fusce imperdiet ac urna ut dapibus. Mauris ut dictum dolor. Maecenas a eleifend enim. Vivamus malesuada accumsan venenatis. Praesent dapibus, arcu eu pharetra faucibus, nisl ligula tristique felis, dictum ullamcorper neque elit non enim. Vivamus efficitur dui eu erat gravida finibus. Etiam molestie lorem est. Suspendisse massa ipsum, sodales a sapien eu, sollicitudin efficitur urna. Morbi consectetur, est eu facilisis dictum, magna sapien congue justo, eget finibus nisi justo eu lacus. Mauris efficitur, libero eu scelerisque maximus, libero massa blandit sem, porta condimentum purus tortor sit amet ante. Aenean sit amet ligula eget ante euismod placerat. Aliquam eros augue, dapibus quis rutrum vel, aliquet vel sapien. Etiam at elit maximus dolor pulvinar ullamcorper vitae quis quam. Curabitur id diam odio. Maecenas quis dolor et arcu scelerisque venenatis. Mauris hendrerit sodales dignissim. Phasellus quis pharetra odio. Donec gravida tempus massa. Morbi dignissim nisl eros, at ornare ex tempor eget. Mauris sed nisl sem. Phasellus porta vestibulum dui vel convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper iaculis sapien, commodo laoreet turpis mollis vel. Donec eu imperdiet erat, at consequat metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer in magna laoreet, dignissim ligula eu, pretium dui. Morbi vestibulum arcu vel eros rutrum, id egestas dolor accumsan. Integer convallis pretium nisi ac lacinia. Nam egestas rutrum arcu sed tristique. Nunc pretium sapien quis sem ullamcorper rutrum. Cras varius nibh et ex auctor faucibus. Proin dolor nulla, efficitur id arcu et, dapibus suscipit ipsum."
          },
          {
            id: 1,
            title: "What class do i play",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse rhoncus, justo quis consequat dignissim, ipsum est lobortis lectus, faucibus blandit nunc neque eget tortor. Donec condimentum nibh sed est tristique aliquam. Donec eu nulla ultrices orci ultrices aliquet. Nulla eget rhoncus justo, at mattis enim. Proin finibus pharetra turpis eu sollicitudin. Morbi cursus elementum mauris, id porta dui convallis ac. Pellentesque vitae nulla felis. Fusce imperdiet ac urna ut dapibus. Mauris ut dictum dolor. Maecenas a eleifend enim. Vivamus malesuada accumsan venenatis. Praesent dapibus, arcu eu pharetra faucibus, nisl ligula tristique felis, dictum ullamcorper neque elit non enim. Vivamus efficitur dui eu erat gravida finibus. Etiam molestie lorem est. Suspendisse massa ipsum, sodales a sapien eu, sollicitudin efficitur urna. Morbi consectetur, est eu facilisis dictum, magna sapien congue justo, eget finibus nisi justo eu lacus. Mauris efficitur, libero eu scelerisque maximus, libero massa blandit sem, porta condimentum purus tortor sit amet ante. Aenean sit amet ligula eget ante euismod placerat. Aliquam eros augue, dapibus quis rutrum vel, aliquet vel sapien. Etiam at elit maximus dolor pulvinar ullamcorper vitae quis quam. Curabitur id diam odio. Maecenas quis dolor et arcu scelerisque venenatis. Mauris hendrerit sodales dignissim. Phasellus quis pharetra odio. Donec gravida tempus massa. Morbi dignissim nisl eros, at ornare ex tempor eget. Mauris sed nisl sem. Phasellus porta vestibulum dui vel convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper iaculis sapien, commodo laoreet turpis mollis vel. Donec eu imperdiet erat, at consequat metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer in magna laoreet, dignissim ligula eu, pretium dui. Morbi vestibulum arcu vel eros rutrum, id egestas dolor accumsan. Integer convallis pretium nisi ac lacinia. Nam egestas rutrum arcu sed tristique. Nunc pretium sapien quis sem ullamcorper rutrum. Cras varius nibh et ex auctor faucibus. Proin dolor nulla, efficitur id arcu et, dapibus suscipit ipsum."
          }        
      ]
  },
}

export default {
  users,
  chapters
}