## I've changed only this configs, the other i've used default ones

daemon on

# ...

videodevice /dev/video0

# ...

width 1280
height 720
framerate 30
minimum_frame_time 0

# ...

output_pictures off
output_debug_pictures off

# ...

quality 90
picture_type jpeg

# ...

ffmpeg_bps 600000
ffmpeg_variable_bitrate 85
ffmpeg_video_codec mp4

snapshot_interval 0

# ...

target_dir /usr/share/hassio/share/motion/
snapshot_filename snapshot/%Y/%m/%d/%H/%v-%M%S-snapshot
picture_filename picture/%Y/%m/%d/%H/%v-%M%S-%q
movie_filename movie/%Y/%m/%d/%v-%Y%m%d%H%M%S
timelapse_filename timelapse/%Y%m%d-timelapse

# ...

stream_port 3081
stream_quality 85
stream_motion on
stream_maxrate 30

# ...

stream_localhost off

# ...

webcontrol_port 3080
webcontrol_localhost off
webcontrol_html_output on

# ...

quiet on
on_movie_start wget -q -O- --header='Content-Type:application/json' --post-data='{"file":"%f", "action":"start", "motion_area": {"x":"%K", "y":"%L", "width": "%i", "height":"%J"}}' http://127.0.0.1:8080/api/v1/motion/movie
on_movie_end wget -q -O- --header='Content-Type:application/json' --post-data='{"file":"%f", "action":"end", "motion_area": {"x":"%K", "y":"%L", "width": "%i", "height":"%J"}}' http://127.0.0.1:8080/api/v1/motion/movie