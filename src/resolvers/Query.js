 async function feed(parent, args, context, info) {
  const links = await context.prisma.links()
  return links
}

module.export = {
  feed,
}