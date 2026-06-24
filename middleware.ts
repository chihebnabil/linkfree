// middleware.ts
import { NextResponse } from "next/server";
import { flarelog } from "@flarelog/sdk";
import { withNextMiddleware } from "@flarelog/sdk/next";

const logger = flarelog({ apiKey: process.env.FLARELOG_API_KEY });

export default withNextMiddleware(logger, async (request) => {
  return NextResponse.next();
});
