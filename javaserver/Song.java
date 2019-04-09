/**
 * This class holds song information
 */

public class Song {
    /**
     * Data for Song
     */
    Float key;
    Float mode_confidence;
    Float artist_mbtags_count;
    Float key_confidence;
    Float tatums_start;
    Integer year;
    Float duration;
    Float hotttnesss;
    Float beats_start;
    Float time_signature_confidence;
    String title;
    Float bars_confidence;
    String id;
    Float bars_start;
    String artist_mbtags;
    Float start_of_fade_out;
    Float tempo;
    Float end_of_fade_in;
    Float beats_confidence;
    Float tatums_confidence;
    Integer mode;
    float time_signature;
    Float loudness;

    Song() {
        time_signature = 0.0f;
    }
}
