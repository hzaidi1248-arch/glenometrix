/**
 * Glenoid track and on/off-track classification.
 * Method: Di Giacomo et al., Arthroscopy 2014.
 * Pure function — no side effects.
 *
 * NOTE: This module is no longer used in the calculator flow.
 * On/off-track status is now entered directly by the clinician.
 * Kept for reference and potential future use in the assessment pipeline.
 *
 * Reference: Di Giacomo G, et al. "Evolving concept of bipolar bone loss and
 * the Hill-Sachs lesion: from 'engaging/non-engaging' to 'on-track/off-track'."
 * Arthroscopy. 2014;30(1):90-98.
 */

export interface TrackResult {
  glenoidTrack: number;
  hillSachsTrack: number;
  status: "on-track" | "off-track";
  marginMm: number;
}

interface TrackInput {
  glenoidWidth: number;
  defectWidth: number;
  hillSachsWidth: number;
  hslToRotatorCuffOffset: number;
}

/**
 * Compute glenoid track status from mm measurements.
 *
 * Glenoid Track (GT) = 0.83 × glenoidWidth − boneLossWidth
 * Hill-Sachs Track (HST) = hillSachsWidth + hslToRotatorCuffOffset
 *
 * If HST > GT → OFF-track (lesion engages glenoid rim)
 * If HST ≤ GT → ON-track
 *
 * All measurements in mm.
 */
export function computeTrackStatus(input: TrackInput): TrackResult {
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
