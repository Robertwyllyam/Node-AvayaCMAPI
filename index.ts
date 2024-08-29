import soap, { createClientAsync } from "soap";
import { config } from "dotenv";
config();

const { SMS_HOST, CM_USER, CM_PASSWORD } = process.env;

async function performCMCall(
  operation: "display" | "list" | "change" | "add" | "remove",
  qualifier: string,
  target: string = "Agent",
  targetData = {}
) {
  const soapClient = await createClientAsync(
    `${SMS_HOST}/smsxml/SystemManagementService.php?wsdl`
  );

  const authorization = new soap.BasicAuthSecurity(
    CM_USER as string,
    CM_PASSWORD as string
  );

  soapClient.setSecurity(authorization);

  const requestObject = {
    operation,
    qualifier,
    objectname: "",
    modelFields: { [target]: targetData },
  };

  try {
    //Call the provided operation
    const data = await soapClient.submitRequestAsync(requestObject);

    //Release client's session
    await soapClient.releaseAsync();

    return data;
  } catch (err) {
    await soapClient.releaseAsync();
    return err;
  }
}
