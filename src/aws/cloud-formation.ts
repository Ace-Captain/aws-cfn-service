import {
  Capability, CloudFormationClient, CreateStackCommand, DescribeStacksCommand, UpdateStackCommand,
} from '@aws-sdk/client-cloudformation';


const client = new CloudFormationClient({ region: 'ap-southeast-2' });

const template = `
Resources:
  MyTestRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: "2012-10-17"
        Statement:
          - Effect: Allow
            Principal:
              Service:
                - lambda.amazonaws.com
            Action:
              - 'sts:AssumeRoleWithSAML'`;

const main = async (stackName: string) => {
  try {
    await client.send(new DescribeStacksCommand({
      StackName: stackName,
    }));

    return await client.send(new UpdateStackCommand({
      StackName: stackName,
      TemplateBody: template,
      Capabilities: [Capability.CAPABILITY_IAM],
    }));
  } catch (e: any) {
    if (e.name === 'ValidationError' && e.message === `Stack with id ${stackName} does not exist`) {
      return await client.send(new CreateStackCommand({
        StackName: stackName,
        TemplateBody: template,
        Capabilities: [Capability.CAPABILITY_IAM],
      }));
    }
  }
};

void main('goudan').then(console.log);
