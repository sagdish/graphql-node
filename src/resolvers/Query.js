async function feed(parent, args, context, info) {
  return await context.prisma.links()
}

module.export = {
  feed,
}