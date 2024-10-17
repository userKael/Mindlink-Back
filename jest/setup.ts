/* eslint-disable no-await-in-loop */
import * as child_process from 'child_process';
import { promisify } from 'util';

const exec = promisify(child_process.exec);

const isContainerHealthy = async (containerName: string): Promise<boolean> => {
  const { stdout } = await exec(
    `docker inspect --format "{{.State.Health.Status}}" ${containerName}`,
  );
  return stdout === 'healthy\n';
};

const waitForContainer = async (containerName: string): Promise<void> => {
  let isHealthy: boolean;
  do {
    await promisify(setTimeout)(1000);
    process.stdout.write('.');
    isHealthy = await isContainerHealthy(containerName);
  } while (!isHealthy);
};

const startContainers = async (): Promise<void> => {

};

const setupEnvironment = async (): Promise<void> => {

};

module.exports = async () => {
  if (!process.env.CI) {
    await setupEnvironment();
  }
};
