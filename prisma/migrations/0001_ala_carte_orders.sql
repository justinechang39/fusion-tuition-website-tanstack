-- CreateTable
CREATE TABLE "AlaCarteOrder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'new',
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT,
    "customerPhone" TEXT,
    "studentLevel" TEXT,
    "notes" TEXT,
    "source" TEXT NOT NULL DEFAULT 'ala-carte',
    "campaignSlug" TEXT,
    "rawPayload" TEXT
);

-- CreateTable
CREATE TABLE "AlaCarteOrderItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "durationMin" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "instruction" TEXT,
    CONSTRAINT "AlaCarteOrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "AlaCarteOrder" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "AlaCarteOrder_createdAt_idx" ON "AlaCarteOrder"("createdAt");

-- CreateIndex
CREATE INDEX "AlaCarteOrder_status_idx" ON "AlaCarteOrder"("status");

-- CreateIndex
CREATE INDEX "AlaCarteOrderItem_orderId_idx" ON "AlaCarteOrderItem"("orderId");

-- CreateIndex
CREATE INDEX "AlaCarteOrderItem_itemId_idx" ON "AlaCarteOrderItem"("itemId");
