/*
  Warnings:

  - You are about to drop the column `idade` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `nivel_de_energia` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `porte` on the `pets` table. All the data in the column will be lost.
  - Added the required column `age` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energy` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `port` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "idade",
DROP COLUMN "nivel_de_energia",
DROP COLUMN "porte",
ADD COLUMN     "age" TEXT NOT NULL,
ADD COLUMN     "energy" TEXT NOT NULL,
ADD COLUMN     "port" TEXT NOT NULL;
