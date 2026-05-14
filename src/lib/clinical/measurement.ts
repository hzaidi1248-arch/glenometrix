/**
 * Glenoid track and on/off-track classification.
 * Method: Di Giacomo et al., Arthroscopy 2014.
 * Pure function — no side effects.
 *
 * Reference: Di Giacomo G, et al. "Evolving concept of bipolar bone loss and
 * the Hill-Sachs lesion: from 'engaging/non-engaging' to 'on-track/off-track'."
 * Arthroscopy. 2014;30(1):90-98.
 */

import type { ClinicalInput } from "./types";

export interface TrackResult {
  glenoidTrack: number;
  hillSachsTrack: number;
  status: "on-track" | "off-track";
  marginMm: number;
}

/**
 * Compute glenoid track status.
 *
 * Glenoid Track (GT) = 0.83 × glenoidWidth − boneLossWidth
 * Hill-Sachs Track (HST) = hillSachsWidth + hslToRotatorCuffOffset
 *
 * If HST > GT → OFF-track (lesion engages glenoid rim)
 * If HST ≤ GT → ON-track
 *
 * All measurements in mm.
 */
export function computeTrackStatus(input: ClinicalInput): TrackResult {
  const boneLossWidth = input.defectWidth;
  const glenoidTrack =
    0.83 * input.glenoidWidth - boneLossWidth;
  const hillSachsTrack =
    input.hillSachsWidth + input.hslToRotatorCuffOffset;

  const status = hillSachsTrack > glenoidTrack ? "off-track" : "on-track";
  const marginMm = Math.round((glenoidTrack - hillSachsTrack) * 10) / 10;

  return {
    glenoidTrack: Math.round(glenoidTrack * 10) / 10,
    hillSachsTrack: Math.round(hillSachsTrack * 10) / 10,
    status,
    marginMm,
  };
}
