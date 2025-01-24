/*
  Warnings:

  - Made the column `productId` on table `Extra` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Extra" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "Extra_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Extra" ("id", "name", "price", "productId") SELECT "id", "name", "price", "productId" FROM "Extra";
DROP TABLE "Extra";
ALTER TABLE "new_Extra" RENAME TO "Extra";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
