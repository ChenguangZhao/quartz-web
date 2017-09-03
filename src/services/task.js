import * as postUtil from '../utils/postJson.js';
import request from '../utils/request';

/**
 * add job
 * @param values
 * @returns {*}
 */
export function addJob(values) {
  return postUtil.postJson('/job/addJob.do', values);
}

/**
 * query list
 * @returns {Object}
 */
export function queryJob() {
  return request('/job/queryJob.do');
}

/**
 * pause job
 * @param values
 * @returns {*}
 */
export function pauseJob(values) {
  return postUtil.postJson('/job/pauseJob.do', values);
}

/**
 * resume job
 * @param values
 * @returns {*}
 */
export function resumeJob(values) {
  return postUtil.postJson('/job/resumeJob.do', values);
}

/**
 *
 * @param values
 * @returns {*}
 */
export function rescheduleJob(values) {
  return postUtil.postJson('/job/rescheduleJob.do', values);
}
