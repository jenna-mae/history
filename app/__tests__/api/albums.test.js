import { testApiHandler } from 'next-test-api-route-handler'

import config from '../../../config.json'
import handler from '../../pages/api/galleries/[gallery]/albums'

describe('Albums endpoint', () => {
  describe('Expect result', () => {
    test('* GET has albums', async () => {
      const test = async ({ fetch }) => {
        const response = await fetch({ method: 'GET' })
        const result = await response.json()

        expect(response.status).toBe(200)

        expect(result.albums.length).toBeGreaterThan(0)
        expect(result.albums[0].name).toBe(config.defaultAlbum)
      }
      const params = { gallery: config.defaultGallery }
      await testApiHandler({ handler, test, params })
    })
  })

  describe('Expect error', () => {
    test('* POST verb is denied', async () => {
      const test = async ({ fetch }) => {
        const response = await fetch({ method: 'POST' })
        const result = await response.json()

        expect(response.status).toBe(405)
        expect(result.error.message.toLowerCase()).toContain('not allowed')

        expect(result.albums.length).toBe(0)
      }
      await testApiHandler({ handler, test })
    })
  })
})
