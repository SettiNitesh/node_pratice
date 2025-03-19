-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "userUid" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password_hash" VARCHAR(1024) NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "User"("uid") ON DELETE SET NULL ON UPDATE CASCADE;
