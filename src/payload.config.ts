import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Home } from './globals/Home'
import { settings } from './globals/Settings'
import { Areas } from './collections/Areas'
import { Files } from './collections/Files'
import { Publications } from './collections/Publications'
import { ExpertsCollection } from './collections/Experts'
import { Contact } from './globals/Contact'
import { ServiceGlobal } from './globals/Services'
import { About } from './globals/About'
import { Experts as ExpertsGlobal } from './globals/Experts'
import { Documents } from './globals/Documents'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Files, Areas, Publications, ExpertsCollection],
  globals: [Home, settings, Contact, ServiceGlobal, About, ExpertsGlobal, Documents],
  localization: {
    defaultLocale: 'pt',
    locales: [
      { code: 'pt', label: 'Português' },
      { code: 'en', label: 'English' },
    ],
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [],
})
