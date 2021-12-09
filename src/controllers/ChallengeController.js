/**
 * Controller for challenge endpoints
 */
const HttpStatus = require('http-status-codes')
const service = require('../services/ChallengeService')
const helper = require('../common/helper')
const logger = require('../common/logger')

/**
 * Search challenges
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function searchChallenges (req, res) {
  const result = await service.searchChallenges(req.authUser, { ...req.query, ...req.body })
  helper.setResHeaders(req, res, result)
  res.send(result.result)
}

/**
 * Create challenge
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function createChallenge (req, res) {
  logger.debug(`createChallenge User: ${JSON.stringify(req.authUser)} - Body: ${JSON.stringify(req.body)}`)
  const result = await service.createChallenge(req.authUser, req.body)
  res.status(HttpStatus.CREATED).send(result)
}

/**
 * Get challenge
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function getChallenge (req, res) {
  const result = await service.getChallenge(req.authUser, req.params.challengeId)
  res.send(result)
}

/**
 * Get challenge statistics
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function getChallengeStatistics (req, res) {
  const result = await service.getChallengeStatistics(req.authUser, req.params.challengeId)
  res.send(result)
}

/**
 * Fully update challenge
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function fullyUpdateChallenge (req, res) {
  logger.debug(`fullyUpdateChallenge User: ${JSON.stringify(req.authUser)} - ChallengeID: ${req.params.challengeId} - Body: ${JSON.stringify(req.body)}`)
  const result = await service.fullyUpdateChallenge(req.authUser, req.params.challengeId, req.body)
  res.send(result)
}

/**
 * Partially update challenge
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function partiallyUpdateChallenge (req, res) {
  logger.debug(`partiallyUpdateChallenge User: ${JSON.stringify(req.authUser)} - ChallengeID: ${req.params.challengeId} - Body: ${JSON.stringify(req.body)}`)
  const result = await service.partiallyUpdateChallenge(req.authUser, req.params.challengeId, req.body)
  res.send(result)
}

/**
 * Delete challenge
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function deleteChallenge (req, res) {
  logger.debug(`deleteChallenge User: ${JSON.stringify(req.authUser)} - ChallengeID: ${req.params.challengeId}`)
  const result = await service.deleteChallenge(req.authUser, req.params.challengeId)
  res.send(result)
}

module.exports = {
  searchChallenges,
  createChallenge,
  getChallenge,
  fullyUpdateChallenge,
  partiallyUpdateChallenge,
  deleteChallenge,
  getChallengeStatistics
}
