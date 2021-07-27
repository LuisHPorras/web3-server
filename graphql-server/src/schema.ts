import {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
  inputObjectType,
  arg,
  asNexusMethod,
  enumType,
} from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('allBadges', {
      type: 'Badge',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.badge.findMany()
      },
    })

    t.nullable.field('badgeById', {
      type: 'Badge',
      args: {
        id: intArg(),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.badge.findUnique({
          where: { id: args.id || undefined },
        })
      },
    })

    t.nonNull.list.nonNull.field('feed', {
      type: 'Badge',
      args: {
        skip: intArg(),
        take: intArg(),
        orderBy: arg({
          type: 'BadgeOrderByDate',
        }),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.badge.findMany({
          take: args.take || undefined,
          skip: args.skip || undefined,
          orderBy: args.orderBy,
        })
      },
    })


    // t.nonNull.field('badgesCountByArea', {
    //   type: 'Badge',
    //   args: {
    //     area: stringArg(),
    //   },
    //   resolve: (_, args, context: Context) => {
    //     return context.prisma.badge.count({
    //       data: {
    //         id: args.data.id,
    //         issuerName: args.data.issuerName,
    //         recipientName: args.data.recipientName,
    //         area: args.data.area,
    //         issueDate: DateTime,
    //       },
    //     })
    //   },
    // })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.nonNull.field('addBadge', {
      type: 'Badge',
      args: {
        data: nonNull(
          arg({
            type: 'BadgeCreateInput',
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.badge.create({
          data: {
            id: args.data.id,
            issuerName: args.data.issuerName || '',
            recipientName: args.data.recipientName || '',
            area: args.data.area,
            issueDate: args.data.issueDate || DateTime,
          },
        })
      },
    })
  },
})

const Badge = objectType({
  name: 'Badge',
  definition(t) {
    t.nonNull.int('id')
    t.string('issuerName')
    t.string('recipientName')
    t.string('area')
    t.field('issueDate', {type: 'DateTime'})
  },
})

const BadgeCreateInput = inputObjectType({
  name: 'BadgeCreateInput',
  definition(t) {
    t.nonNull.int('id')
    t.string('issuerName')
    t.string('recipientName')
    t.string('area')
    t.field('issueDate', {type: 'DateTime'})
  },
})

const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
})

const BadgeOrderByDate = inputObjectType({
  name: 'BadgeOrderByDate',
  definition(t) {
    t.nonNull.field('issueDate', { type: 'SortOrder' })
  },
})

export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    Badge,
    SortOrder,
    BadgeOrderByDate,
    BadgeCreateInput,
    DateTime,
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
