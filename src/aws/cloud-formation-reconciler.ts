import {
  Capability, CloudFormationClient, CreateStackCommand, DescribeStacksCommand, UpdateStackCommand,
} from '@aws-sdk/client-cloudformation';

export class CloudFormationReconciler {
  private readonly client: CloudFormationClient;

  constructor(region: string) {
    this.client = new CloudFormationClient({ region });
  }

  async apply(stackName: string, template: string) {
    try {
      await this.client.send(new DescribeStacksCommand({
        StackName: stackName,
      }));

      return await this.client.send(new UpdateStackCommand({
        StackName: stackName,
        TemplateBody: template,
        Capabilities: [Capability.CAPABILITY_IAM],
      }));
    } catch (e: any) {
      if (e.name === 'ValidationError' && e.message === `Stack with id ${stackName} does not exist`) {
        return await this.client.send(new CreateStackCommand({
          StackName: stackName,
          TemplateBody: template,
          Capabilities: [Capability.CAPABILITY_IAM],
        }));
      }
    }
  }
}
