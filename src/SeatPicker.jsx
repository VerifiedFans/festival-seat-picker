/* General Layout */
.seat-picker {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

/* Stage and LED Walls */
.stage {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-bottom: 20px;
}

.led-wall {
  background-color: darkgray;
  width: 15%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.stage-text {
  background-color: #4a4a4a;
  width: 60%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
}

/* Section Headers */
.section {
  margin-bottom: 20px;
}

.section h4 {
  text-align: center;
  margin-bottom: 10px;
  font-size: 16px;
}

/* Seat Layout */
.row {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.seat {
  width: 25px;
  height: 25px;
  margin: 3px;
  border-radius: 5px;
  background-color: #1e3a8a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
}

.seat:hover {
  background-color: #2563eb;
}

.selected {
  background-color: #4ade80 !important;
}

/* VIP Sections */
.vip .seat {
  background-color: #047857;
}

.vip .seat:hover {
  background-color: #065f46;
}

/* GA Sections */
.ga .seat {
  background-color: #1e40af;
}

.ga .seat:hover {
  background-color: #1d4ed8;
}

/* Aisles */
.aisle {
  width: 20px;
}

/* Selected Seats Display */
.selected-seats {
  margin-top: 20px;
  text-align: center;
}

.selected-seats h4 {
  margin-bottom: 5px;
}
